import IconMessageBox from "../IconMessageBox";

export default function NotFound() {
  return (
    <IconMessageBox
      icon="error"
      title="Page not found"
      description="Sorry, we couldn't find the page you were looking for."
      goBack
    />
  );
}
