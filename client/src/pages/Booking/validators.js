import { getter } from '@progress/kendo-react-common';

const date = new Date()


export const nameValidator = value => !value ? "Lỗi: Vui lòng điền họ và tên" : value.length < 7 ? "Lỗi: Họ và tên ít có nhất 7 chữ" : "";

export const dateValidator = value => !value ? "Lỗi : cần nhập thông tin cho trường này" : (((value.start.getTime() - date.getTime()) / 1000) / 86400) < -1 ? "Lỗi: Ngày nhận phòng không hợp lệ" : !value.end ? "Lỗi: Ngày trả phòng không hợp lệ" : ""


export const requiredValidator = value => value ? "" : "Lỗi: cần nhập thông tin cho trường này ";



