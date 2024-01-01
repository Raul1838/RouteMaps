import { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {NavBar} from "../components/NavBar.tsx";
import {SideBar} from "../components/SideBar.tsx";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Container fluid style={{ padding: 0 }}>
            <Row style={{ height: '60px' }}>
                <Col xs={12}>
                    <NavBar/>
                </Col>
            </Row>
            <Row style={{ marginTop: '60px' }}>
                <Col xs={2} style={{ width: '50px' }}>
                    <SideBar/>
                </Col>
                <Col xs={10} style={{ marginLeft: '50px' }}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};
