import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "Context/Authentication ";
import { axiosInstance } from "Axios.js";
import { Link, useNavigate } from "react-router-dom";
import Btn from "Dashboard/SharedUI/Btn/Btn";

const Login_URL = "admin/auth";
const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser, setUserToken } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [errmsg, seterrmsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    seterrmsg("");
  }, [user, password]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        Login_URL,
        { email: user, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data.data.user);
      const authUser = response?.data.data.user;
      const accessToken = response?.data.data.token;
      setAuthUser(authUser);
      localStorage.setItem("token", accessToken);
      setUserToken(accessToken);
      setuser("");
      setpassword("");
      navigate("/admin/index");
    } catch (err) {
      console.error(err.response.data.message);
      const erorr = err.response.data.message;
      seterrmsg(erorr || "please Enter your email Password Correctly");
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className={"row text-center mt-5"}>
        <Card className="bg-secondary shadow border-0 col-lg-5 col-md-7 mx-auto">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <p ref={errRef} className="text-danger" aria-live="assertive">
                {errmsg}
              </p>
              <small>Sign in</small>
            </div>
            <Form role="form" onSubmit={handelSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    id="email"
                    autoComplete="off"
                    ref={userRef}
                    onChange={(e) => {
                      setuser(e.target.value);
                    }}
                    value={user}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    value={password}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <Link to="/admin/ForgetPssword"><p>Forgot Password?</p></Link>
              <div className="text-center">
                <Btn className="btn btn-info" type="submit" title=" Sign in " />
              </div>
              <Row className="mt-3">
                <Col xs="6">
                  <Link to="/auth/reset-password-token"></Link>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
