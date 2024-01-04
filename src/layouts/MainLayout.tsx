import React, {ReactNode, useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {NavBar} from "../components/NavBar.tsx";
import {SideBar} from "../components/SideBar.tsx";
import {DetailsPage} from "../auth/pages/DetailsPage.tsx";
import {PreferencesPage} from "../auth/pages/PreferencesPage.tsx";
import {AuthContext, AuthContextInterface} from "../context/AuthContext.tsx";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const {wantDetails, wantPreferences}: AuthContextInterface = useContext(AuthContext);

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
                {
                    wantDetails && <DetailsPage />
                }
                {
                    wantPreferences && <PreferencesPage />
                }
            </Row>
        </Container>
    );
};
