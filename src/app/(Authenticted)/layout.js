
import Header from "@/components/Header/header";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
