import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Card, Spinner } from 'react-bootstrap';
import InstructorForm from './components/InstructorForm';
import AdminPanel from './components/AdminPanel';
import { useSchedule } from './context/ScheduleContext';
import './App.css';

const App = () => {
  const { isLoading } = useSchedule();
  const [activeTab, setActiveTab] = useState('instructor');
  const [appLoaded, setAppLoaded] = useState(false);
  
  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 2000); // 2 seconds loading screen
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!appLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-container">
            <img 
              src="/fitlife-logo.png" 
              alt="FitLife Logo" 
              className="animate__animated animate__pulse animate__infinite loading-logo"
              style={{ 
                maxWidth: '150px', 
                marginBottom: '20px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '15px'
              }} 
            />
          </div>
          <Spinner animation="border" variant="light" />
          <p className="mt-3 loading-text">Loading FitLife Class Scheduling...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Container fluid className="app-container">
      <header className="app-header py-3">
        <h1 className="text-center mb-0">
          <img 
            src="/fitlife-logo.png" 
            alt="FitLife Logo" 
            style={{ height: '40px', marginRight: '10px' }} 
          />
          FitLife Class Scheduling
        </h1>
      </header>
      
      <Row className="my-4">
        <Col>
          <Tab.Container id="main-tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Card>
              <Card.Header>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="instructor">Instructor Form</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="admin">Admin Panel</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="instructor">
                    {isLoading ? (
                      <div className="text-center p-5">
                        <Spinner animation="border" />
                        <p className="mt-3">Loading...</p>
                      </div>
                    ) : (
                      <InstructorForm />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="admin">
                    <AdminPanel />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
      
      <footer className="app-footer py-3 text-center">
        <p className="mb-0">© {new Date().getFullYear()} FitLife Health Clubs. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default App;