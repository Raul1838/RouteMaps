import {RegisterForm} from "../components/RegisterForm.tsx";

export const RegisterPage = () => {
    return(
        <div className="row" style={{ margin: '20px' }}>
            <div className="col-6">
                <RegisterForm />
            </div>
            <div className="col-6">
                <img src="https://i.pinimg.com/originals/89/54/f8/8954f88c60dfde5438e2a5233579b580.jpg" />
            </div>
        </div>
    )
}
