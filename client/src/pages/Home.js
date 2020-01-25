import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';

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

  const chartData =
    datosDiarios &&
    datosDiarios.data.reduce(
      (res, individulData) => {
        const { COMPLETAMIENTO, FECHA, PD_PETROLEO, PD_GAS, PD_AGUA } = individulData;
        res[0].push(COMPLETAMIENTO);
        res[1].push(FECHA);
        res[2].push(PD_GAS);
        res[3].push(PD_AGUA);
        res[4].push(PD_PETROLEO);
        return res;
      },
      [[], [], [], [], []],
    ); // start with an array of 4 empty arrays into which we can push our values

  // console.log(chartData[2].length());

  const colorGas = ['rgba(219, 40, 40, 0.7)'];

  const dataForChart = {
    labels: chartData[1],
    datasets: [
      {
        label: 'Producción de Gas',
        fill: false,
        lineTension: 0.0,
        backgroundColor: 'rgba(219, 40, 40, 0.4)',
        borderColor: 'rgba(219, 40, 40, 1)',
        borderDash: [],
        borderDashOffset: 0.0,
        borderWidth: 1,
        pointBorderColor: 'rgba(219, 40, 40, 1)',
        pointBackgroundColor: 'rgba(219, 40, 40, 0.4)',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(219, 40, 40, 1)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 2,
        data: chartData[2],
      },
      {
        label: 'Producción de Agua',
        fill: false,
        lineTension: 0.0,
        backgroundColor: 'rgba(33, 133, 208, 0.4)',
        borderColor: 'rgba(33, 133, 208, 1)',
        borderDash: [],
        borderDashOffset: 0.0,
        borderWidth: 1,
        pointBorderColor: 'rgba(33, 133, 208, 1)',
        pointBackgroundColor: 'rgba(33, 133, 208, 0.4)',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(33, 133, 208, 1)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 2,
        data: chartData[3],
      },
      {
        label: 'Producción de Petroleo',
        fill: false,
        lineTension: 0.0,
        backgroundColor: 'rgba(33, 186, 69, 0.4)',
        borderColor: 'rgba(33, 186, 69, 1)',
        borderDash: [],
        borderDashOffset: 0.0,
        borderWidth: 1,
        pointBorderColor: 'rgba(33, 186, 69, 1)',
        pointBackgroundColor: 'rgba(33, 186, 69, 0.4)',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgba(33, 186, 69, 1)',
        pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
        pointHoverBorderWidth: 2,
        data: chartData[4],
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
