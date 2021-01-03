import Order from '../models/order.model.js';
import Collection from '../models/collection.model.js';

const getSumOfChalansByCourier = async (to_date) => {

    to_date.setDate(to_date.getDate() - 1);

    return await Order.aggregate([
        {
            $match: {
                'current_order_status.status_name': {
                    $nin: ['Pending', 'Confirmed', 'Cancelled', 'PreOrder']
                }
            }
        },
        {
            $unwind: '$performed_order_statuses'
        },
        {
            $match: {
                'performed_order_statuses.status_name': 'Inshipment',
                'performed_order_statuses.updated_at': {
                    $lte: new Date(to_date)
                }
            }
        },
        {
            $group: {
                _id: '$carrier',
                opening: { $sum: '$payable_amount' }
            }
        },
        {
            $lookup: {
                from: "ordercarriers",
                localField: "_id",
                foreignField: "_id",
                as: "carrier"
            }
        },
        {
            $unwind: '$carrier'
        },
        {
            $project: {
                courier: "$carrier.name",
                opening_amount: "$opening"
            }
        }
    ])
}

const getOpeningOfChalanByCourier = async (from_date, to_date) => {
    return await Collection.aggregate([
        {
            $match: {
                courier_id: { $exists: true },
                'created_at': {
                    $gt: new Date(from_date), $lte: new Date(to_date)
                }
            }
        },
        {
            $group: {
                _id: '$courier_id',
                collection: {
                    $sum: { $subtract: ['$total_amount', '$return_amount'] }
                }
            },
        },
        {
            $lookup: {
                from: "ordercarriers",
                localField: "_id",
                foreignField: "_id",
                as: "carrier"
            }
        },
        {
            $unwind: '$carrier'
        },
        {
            $project: {
                courier: "$carrier.name",
                total_collection: "$collection"
            }
        }
    ])
}

const getMergedCollectionReport = (openings, collections) => {
    return openings.map(order => {
        let colection = collections.find(col => col.courier == order.courier);
        order.total_collection = colection ? colection.total_collection : 0;
        return order;
    })
}


export {
    getSumOfChalansByCourier, getOpeningOfChalanByCourier, getMergedCollectionReport
}