import { useLogin } from "@/hooks/useLogin";

const MobileLoginModal = () => {
    const { sendOtp, authState } = useLogin();
    

    return (
        <div>
            <h2>Login</h2>
            <form>
                <button type='button'>X</button>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default MobileLoginModal;