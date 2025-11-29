import { FormEvent, useState } from "react"
import { Spinner } from "react-bootstrap"
import supabase from "../init/init_supababse"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { VerifyOtpParams } from "@supabase/supabase-js"

const Authenticate = () => {
    const nav = useNavigate()
    const [otp, setOtp] = useState<string>("")
    const [otp_sent, setOtpSent] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [account_type, setAccountType] = useState<"email" | "phone">()

    const handle_submit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const credentials= account_type==="email"? {  email,
            options: {
                shouldCreateUser: true
            }}:{  phone,
                options: {
                    shouldCreateUser: true
                }}
        supabase.auth.signInWithOtp({
           ...credentials
        }).then(res => {
            if (res.error !== null) {
                toast(res.error.message)
            } else {
                setOtpSent(true)
            }

        }).catch(() => {
            toast("Something went wrong")
        }).finally(() => {
            setLoading(false)
        })

    }


    const handle_otp_submit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const credentials = (account_type==="email"? {
            token: otp,
            email,
            type: "email" as const
        }:{
            token: otp,
            phone,
            type: "sms" as const
        }) as VerifyOtpParams
        supabase.auth.verifyOtp({
            ...credentials
        }).then(res => {
            if (res.error !== null) {
                toast(res.error.message)
                return
            }
            const signup_option = sessionStorage.getItem("type")
            if (signup_option === "individual") {
                nav("/onboard/user")
            } else if (signup_option === "business") {
                nav("/onboard/business")
            } else {
                nav("/")
            }
        }).catch(() => {
            toast("Something went wrong")
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <div className="container text-center">
                <img src={"https://cdn.clipond.com/swiftlink/logo.png"} className="img-fluid" width={100} alt="logo" />
                <h3>Create An Account</h3>
                {
                    account_type === undefined ?
                        <div>
                            <p>Use one of the options below to create an account</p>
                            <div className="d-flex  gap-2 flex-row align-items-center justify-content-center">
                                <button className="btn btn-outline-primary  " style={{ width: "150px" }} onClick={() => setAccountType("email")}>Email</button>
                                or
                                <button className="btn btn-outline-primary  " style={{ width: "150px" }} onClick={() => setAccountType("phone")}>Phone Number</button>
                            </div>
                        </div>
                        :
                        (
                            !otp_sent ?
                                <form onSubmit={handle_submit}>
                                    <div className="mb-2">
                                        <p>Please enter your {account_type==="email"?"email address":"phone number"} to create an account</p>
                                        <input
                                            type={account_type==="email"?"email":"tel"}
                                            className="form-control text-center"
                                            placeholder={account_type==="email"?"jane@doe.com":"+2348012345678"}
                                            value={account_type==="email"?email:phone}
                                            onChange={(e) => account_type==="email"?setEmail(e.target.value):setPhone(e.target.value)}
                                        />

                                    </div>
                                    <div className="mb-2">
                                        {/* <small>By continuing, you agree to our <a href="/legal/privacy-policy" target="_blank"  className="p_text">Privacy Policy</a></small> */}
                                    </div>
                                    <div>
                                        <button type="submit" className="btn p_btn" disabled={loading}>{loading ? <Spinner size="sm" /> : "Continue"}</button>

                                    </div>

                                </form>
                                :
                                <form onSubmit={handle_otp_submit}>
                                    <div className="mb-2">
                                        <p>Please enter the OTP sent to {account_type==="email"?email:phone}. 
                                            {account_type==="email"&&<><br />Check your <b>spam / junk</b> folder if you can't find it in your inbox folder.</>}
                                        </p>
                                        <input
                                            type="text"
                                            className="form-control text-center"
                                            placeholder="123456"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" className="btn p_btn" disabled={loading}>{loading ? <Spinner size="sm" /> : "Continue"}</button>

                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-none" onClick={() => setOtpSent(false)}><u>Back</u></button>
                                    </div>
                                </form>
                        )

                }
          
            </div>
            <ToastContainer />
        </div>
    )
}

export default Authenticate
