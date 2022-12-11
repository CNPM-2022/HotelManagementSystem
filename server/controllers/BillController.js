import Bill from '../models/Bill.js';

const getBills = async (req, res) => {
    try {
        const bills = await Bill.find()
            .populate({ path: 'booking', populate: { path: 'customerList' }, populate: { path: 'room' } })
            .populate('user');
        res.status(200).json({
            success: true,
            message: 'Get all bills successfully',
            bills,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        });
    }
};

const getBillById = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await Bill.findById(id)
            .populate({ path: 'booking', populate: { path: 'customerList' }, populate: { path: 'room' } })
            .populate('user');
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Get bill successfully',
            bill,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        });
    }
};

const createBill = async (req, res) => {
    try {
        const { bookingId, userId, dateOfPayment, totalAmount, address } = req.body;
        const bill = await Bill.create({
            booking: bookingId,
            user: userId,
            dateOfPayment,
            totalAmount,
            address,
        });
        if (!bill) {
            return res.status(400).json({
                success: false,
                message: 'Create bill failed',
            });
        }
        res.status(201).json({
            success: true,
            message: 'Create bill successfully',
            bill,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error,
        });
    }
};

export { getBills, getBillById, createBill };
