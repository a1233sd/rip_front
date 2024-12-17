import {Col, Container, Row} from "reactstrap";

const HomePage = () => {
	return (
		<Container>
			<Row>
			<Col md="12">
    <h1 className="mb-3">Приказы!</h1>
    <p className="fs-5">
        На этой странице вы можете просматривать, добавлять и управлять приказами. 
        Система позволяет фильтровать приказы по статусу, дате создания и другим параметрам, 
        а также отслеживать выполнение задач, связанных с отчислением студентов.
    </p>
</Col>

			</Row>
		</Container>
	)
}

export default HomePage