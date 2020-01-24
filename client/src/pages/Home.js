import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card } from 'semantic-ui-react';
import { Bar, Line } from 'react-chartjs-2';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY, FETCH_DAILY_DATA_QUERY } from '../util/graphql';

const Home = () => {
  let posts = '';
  let datosDiarios = '';
  // const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // const { data } = useQuery(FETCH_POSTS_QUERY);

  // useEffect(() => {
  //   if (data) {
  //     setPosts(data.getPosts);
  //   }
  // }, [data]);

  // const [datosDiarios, setDatosDiarios] = useState([]);
  const { loading, data } = useQuery(FETCH_DAILY_DATA_QUERY);

  // if (data) {
  //   posts = { data: data.getPosts };
  // }

  if (data) {
    datosDiarios = { data: data.getDataDiaria };
  }

  const FECHA_DATA = [datosDiarios && datosDiarios.data.map(fecha => fecha.FECHA)];
  const PRODUCCION_GAS = [datosDiarios && datosDiarios.data.map(pd_gas => pd_gas.PD_GAS)];
  const PRODUCCION_AGUA = [datosDiarios && datosDiarios.data.map(pd_agua => pd_agua.PD_AGUA)];
  const PRODUCCION_PRTROLEO = [datosDiarios && datosDiarios.data.map(pd_petroleo => pd_petroleo.PD_PETROLEO)];

  const dataForChart = {
    labels: FECHA_DATA[0],
    datasets: [
      {
        label: 'Producción de Gas',
        data: PRODUCCION_GAS[0],
        backgroundColor: ['rgba(219, 40, 40, 0.2)'],
        borderColor: ['rgba(219, 40, 40, 1)'],
        borderWidth: 1,
        fill: false,
        lineTension: 0.0,
      },
      {
        label: 'Producción de Agua',
        data: PRODUCCION_AGUA[0],
        backgroundColor: ['rgba(33, 133, 208, 0.2)'],
        borderColor: ['rgba(33, 133, 208, 1)'],
        borderWidth: 1,
        fill: false,
        lineTension: 0.0,
      },
      {
        label: 'Producción de Petroleo',
        data: PRODUCCION_PRTROLEO[0],
        backgroundColor: ['rgba(33, 186, 69, 0.2)'],
        borderColor: ['rgba(33, 186, 69, 1)'],
        borderWidth: 1,
        fill: false,
        lineTension: 0.0,
      },
    ],
  };

  return (
    // <Grid columns={3}>
    //   <Grid.Row className='page-title'>
    //     <h1>Post Recientes</h1>
    //   </Grid.Row>
    //   {user && (
    //     <Grid.Row>
    //       <Grid.Column style={{ margin: 'auto' }}>
    //         <PostForm />
    //       </Grid.Column>
    //     </Grid.Row>
    //   )}
    //   <Grid.Row>
    //     {loading ? (
    //       <h1>Cargando Posts...</h1>
    //     ) : (
    //       data.getPosts &&
    //       data.getPosts.map(post => (
    //         <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
    //           <PostCard post={post} />
    //         </Grid.Column>
    //       ))
    //     )}
    //   </Grid.Row>
    // </Grid>
    <Card style={{ width: '100%' }}>
      <Card.Content header='Monitoreo de Producción' />
      <Card.Content>
        <Line data={dataForChart} width={600} height={350} options={{ maintainAspectRatio: false }} />
      </Card.Content>
      {/* <Card.Content extra>
        <Icon name='user' />4 Friends
      </Card.Content> */}
    </Card>
  );
};

export default Home;
