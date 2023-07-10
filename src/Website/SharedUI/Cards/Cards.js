const { Card, CardBody, CardFooter } = require("reactstrap")

const Cards = ({footer, body, style}) => {
    return (
        <Card style={style} className="shadow mb-4">
            <CardBody>
               {body}
            </CardBody>
            <CardFooter>
                {footer}
            </CardFooter>
        </Card>
    )
}

export default Cards;