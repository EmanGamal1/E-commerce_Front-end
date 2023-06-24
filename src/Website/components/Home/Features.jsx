import { Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHeadphones,
  faPercent,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

export const Features = () => {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col lg="3" xs="6">
            <div className="bg-secondary p-2 d-flex features-card" style={{minHeight:"120px"}}>
              <div className="align-self-center mx-4">
                <FontAwesomeIcon icon={faTruck} size="2xl" color="#fd4b6b" />
              </div>
              <div>
                <div className="h2 bold text-dark"> توصيل مجاني</div>
                <div className="h6 text-dark">
                  علي جميع المنتجات و جيمع الطلبات
                </div>
              </div>
            </div>
          </Col>
          <Col lg="3" xs="6">
            <div className="bg-secondary p-2 d-flex features-card" style={{minHeight:"120px"}}>
              <div className="align-self-center mx-4">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  size="2xl"
                  color="#fd4b6b"
                />
              </div>
              <div>
                <div className="h2 bold text-dark"> استرداد للطبات</div>
                <div className="h6 text-dark">ضمان استعادة الاموال</div>
              </div>
            </div>
          </Col>
          <Col lg="3" xs="6">
            <div className="bg-secondary p-2 d-flex features-card" style={{minHeight:"120px"}}>
              <div className="align-self-center mx-4">
                <FontAwesomeIcon
                  icon={faHeadphones}
                  size="2xl"
                  color="#fd4b6b"
                />
              </div>
              <div>
                <div className="h2 bold text-dark"> دعم 24/7</div>
                <div className="h6 text-dark">اتصل بنا 24 ساعة في اليوم</div>
              </div>
            </div>
          </Col>
          <Col lg="3" xs="6">
            <div className="bg-secondary p-2 d-flex features-card" style={{minHeight:"120px"}}>
              <div className="align-self-center mx-4">
                <FontAwesomeIcon icon={faPercent} size="2xl" color="#fd4b6b" />
              </div>
              <div>
                <div className="h2 bold text-dark"> خصم علي الطلبات</div>
                <div className="h6 text-dark">
                  على كل طلب يزيد عن 140.00 جنيه
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
