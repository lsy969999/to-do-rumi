import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const TestSlick = () => {
    const settings = {
        dots: false,
        intinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
  return (
    <div>
        <nav>TestSlick</nav>
        <div>
            <Slider {...settings}>
            <div className='bg-indigo-200 w-10 h-10'>
                <span>1</span>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
            </Slider>
        </div>
    </div>
  )
}

export default TestSlick