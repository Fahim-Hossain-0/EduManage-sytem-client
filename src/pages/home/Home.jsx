import React from 'react';
import Banner from '../../components/Banner';
import Highlight from '../../components/Highlight';
import MostPopular from '../../components/MostPopular';

const Home = () => {
    return (<>
            <Banner></Banner>
        <div className='w-[95%] container mx-auto'> 
            <Highlight></Highlight>
            <MostPopular></MostPopular>
        </div>
        </>
    );
};

export default Home;