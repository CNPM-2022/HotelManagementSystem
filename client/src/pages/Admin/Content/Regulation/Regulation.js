import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRegulations, putUpdateRegulations } from '../../../../services/apiServices';

function Regulation() {
    const [regulations, setRegulations] = useState({});

    useEffect(() => {
        fetchRegulations();
    }, []);
    const fetchRegulations = async () => {
        const res = await getRegulations();

        if (res && res.data && res.data.success === true) {
            setRegulations(res.data.law[0]);
        }
    };

    const handleSubmit = async () => {
        // Validate
        let isValid = true;
        const heSo = +regulations.heSo;
        const phuThu = +regulations.phuThu;

        if (isNaN(heSo) || heSo <= 0) {
            toast.error('Hệ số không hợp lệ!');
            isValid = false;
        }

        if (isNaN(phuThu) || phuThu < 0) {
            toast.error('Phụ thu không hợp lệ!');
            isValid = false;
        }

        if (isValid) {
            const res = await putUpdateRegulations({
                heSo,
                phuThu,
            });

            if (res && res.data && res.data.success === true) {
                toast.success(res.data.message);
            } else {
                toast.error(res.message);
            }
        }
    };

    return (
        <div className="admin-regulation-container">
            <h3 className="text-center">Thay đổi Quy định</h3>
            <hr />
            <div className="row">
                <div className="col-6">
                    <label className="form-label">Hệ số (Người nước ngoài):</label>
                    <input
                        value={regulations?.heSo ? regulations?.heSo : ''}
                        onChange={(event) =>
                            setRegulations((prev) => ({
                                ...prev,
                                heSo: event.target.value,
                            }))
                        }
                        className="form-control"
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Phụ thu (Khách thứ 3):</label>
                    <input
                        value={regulations?.phuThu ? regulations.phuThu : ''}
                        onChange={(event) =>
                            setRegulations((prev) => ({
                                ...prev,
                                phuThu: event.target.value,
                            }))
                        }
                        className="form-control"
                    />
                </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary mt-4">
                Thay đổi
            </button>
        </div>
    );
}

export default Regulation;
