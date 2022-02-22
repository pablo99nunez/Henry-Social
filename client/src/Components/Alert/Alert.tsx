import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const InfoAlert = Swal.mixin({
  toast: true,
  position: "bottom-start",
  icon: "success",
  background: "#ff1",
  showConfirmButton: false,
  iconColor: "#000",
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
