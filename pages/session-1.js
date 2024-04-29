import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Media from '../utils/fetchMedia'
import News from '../utils/fetchNews'

function session() {



    const [agendaSpeakers, setAgendaSpeakers] = useState('');

    const session = [
        { 'id': '1', 'name': 'Day 1' },
        { 'id': '2', 'name': 'Day 2' },
        { 'id': '3', 'name': 'Day 3' },
        
    ]

    const handleSession = (e) => {
        const vesselId = e.target.value;

        //alert(vesselId)
        //const selectedOption = e.target.options[e.target.selectedIndex];
        //setSelectedVessel(selectedOption.text);
       // console.log(selectedOption.text)
        //alert(selectedOption.text);
        // Retrieve positions based on vesselId
        switch (vesselId) {
          case '1':
            setAgendaSpeakers(<Media/>);
            break;
          case '2':
            setAgendaSpeakers(<News/>);
            break;
          case '3':
            setAgendaSpeakers(['Chief Officer', '2nd Officer', '3rd Officer', '4th Engineer', 'Oiler']);
            break;
          
          default:
            setAgendaSpeakers([]);
        }
      };


  return (
    <Container>
      
          <Row>
              <Col className='row'>
                  {
                      session.map((items, index) => (
                          <button onClick={handleSession} value={items.id} key={index}>{items.name}</button>
                      ))

              }
              
              </Col>
              <Col>Agenda
              
                  { agendaSpeakers}
              </Col>
      </Row>
    </Container>
  )
}





export default session
