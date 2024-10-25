import 'bootstrap/dist/css/bootstrap.min.css';
import { FaAddressCard } from "react-icons/fa";
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Search from "./components/Search";
import AddDetails from './components/AddDetails';
import DetailsInfo from './components/DetailsInfo';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [DetailsList, setDetailsList] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editDetail, setEditDetail] = useState(null);

  const filteredDetails = DetailsList.filter(
    item => {
      return (
        item.fullName.toLowerCase().includes(query.toLowerCase()) ||
        item.specilization.toLowerCase().includes(query.toLowerCase()) ||
        item.city.toLowerCase().includes(query.toLowerCase())
      );
    }
  );

  const fetchDetails = useCallback(() => {
    axios.get('http://localhost:3001/doctors')
      .then(response => {
        setDetailsList(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleAddDetail = (newDetail) => {
    axios.post('http://localhost:3001/doctors', newDetail)
      .then(response => {
        setDetailsList([...DetailsList, response.data]);
      })
      .catch(error => {
        console.error("Error adding detail:", error);
      });
  };

  const handleUpdateDetail = (updatedDetail) => {
    axios.put(`http://localhost:3001/doctors/${updatedDetail.id}`, updatedDetail)
      .then(response => {
        setDetailsList(DetailsList.map(detail => detail.id === updatedDetail.id ? response.data : detail));
        setEditDetail(null);
      })
      .catch(error => {
        console.error("Error updating detail:", error);
      });
  };

  const handleDeleteDetail = (detailId) => {
    axios.delete(`http://localhost:3001/doctors/${detailId}`)
      .then(() => {
        setDetailsList(DetailsList.filter(detail => detail.id !== detailId));
      })
      .catch(error => {
        console.error("Error deleting detail:", error);
      });
  };

  const handleEditDetail = (detail) => {
    setEditDetail(detail);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1 className='text-center fw-light mt-3'><FaAddressCard /> Doctor Details</h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <AddDetails
            onSendDetails={handleAddDetail}
            lastId={DetailsList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
            editDetail={editDetail}
            onUpdateDetail={handleUpdateDetail}
          />
        </Row>
        <Row className='justify-content-center'>
          <Col md='4'>
            <Search query={query} onQueryChange={setQuery} />
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md='8'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Card className='mb-3'>
                <Card.Header>Details</Card.Header>
                <ListGroup variant='flush'>
                  {filteredDetails.map(Detail => (
                    <DetailsInfo
                      key={Detail.id}
                      Detail={Detail}
                      onDeleteDetail={handleDeleteDetail}
                      onEditDetail={handleEditDetail}
                    />
                  ))}
                </ListGroup>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
