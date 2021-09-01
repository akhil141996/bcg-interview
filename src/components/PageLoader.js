import Lottie from "lottie-react";
import animationData from '../assets/lottie/64114-scooter-with-side-car.json'

export default function LottieLoader() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Lottie
                animationData={animationData}
                style={{ height: 300, width: 300 }}
            />
        </div>
    )
}