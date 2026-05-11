import Swal from "sweetalert2";

export const showPopup = (text: String) => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: text,
        showConfirmButton: false,
        timer: 500,
    });
};
