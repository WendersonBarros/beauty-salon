import Swal, { type SweetAlertIcon } from "sweetalert2";

export function customAlert(
  title: string,
  text: string,
  icon: SweetAlertIcon = "info"
) {
  return Swal.fire({
    title,
    text,
    icon,
    theme: 'dark',
    customClass: {
      title: "text-lg font-semibold",
      popup: "rounded-xl",
    },
  });
}

export const alertError = (msg: string) =>
  customAlert("Erro", msg, "error");

export const alertSuccess = (msg: string) =>
  customAlert("Sucesso", msg, "success");
