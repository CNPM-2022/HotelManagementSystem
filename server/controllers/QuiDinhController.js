import QuiDinh from '../models/QuiDinh';

const getQuiDinh = async (req, res) => {
    try {
        const law = await QuiDinh.find();
        if (law) {
            return res.status(200).json({
                success: true,
                message: 'Law fetched successfully',
                law,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Law not found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// @desc    Update qui dinh
// @route   PUT /api/quidinh
// @access  Private

const updateQuiDinh = async (req, res) => {
    try {
        const { heSo, phuThu } = req.body;
        const law = await QuiDinh.findOneAndUpdate(
            {},
            {
                heSo,
                phuThu,
            },
            { new: true },
        );
        if (law) {
            return res.status(200).json({
                success: true,
                message: 'Law updated successfully',
                law,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Law not found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export { getQuiDinh, updateQuiDinh };
