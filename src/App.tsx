import './App.css';
import {RegisterPage} from "./Auth/pages/RegisterPage.tsx";


export const App = () => {

    return (
      <>
          <div className="row" style={{ margin: '20px' }}>
              <div className="col-6">
                <RegisterPage />
              </div>
              <div className="col-6">
                  <img src="https://i.pinimg.com/originals/89/54/f8/8954f88c60dfde5438e2a5233579b580.jpg" />
              </div>
          </div>
      </>
  )
}
