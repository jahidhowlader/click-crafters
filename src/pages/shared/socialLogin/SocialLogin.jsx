import useAuthContext from "../../../hook/useAuthContext";

const SocialLogin = () => {

    // Context API
    const { googleSignin } = useAuthContext()

    // handlerGoogleSignin
    const handlerGoogleSignin = () => {
        googleSignin()
    }

    return (
        <div className="max-w-6xl mx-auto">
            <button onClick={handlerGoogleSignin} className="bg-blue bg-opacity-60 text-white w-full py-3 mt-5">Sign-in with Google</button>
            
        </div>
    );
};

export default SocialLogin;