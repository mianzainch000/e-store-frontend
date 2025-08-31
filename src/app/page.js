import LoginForm from "./auth/login/page";

const Login = () => {
  return <LoginForm />;
};

export default Login;

export function generateMetadata() {
  return { title: "Login" };
}
