import { Carousel } from "antd";

import banner1 from "../../shared/ui/images/banner 1.jpg";
import banner2 from "../../shared/ui/images/banner 2.jpg";
import banner3 from "../../shared/ui/images/banner 3.jpg";
import banner4 from "../../shared/ui/images/banner 4.png";
import banner6 from "../../shared/ui/images/banner 6.png";

export default function HeroBanner() {
    const banners = [banner1, banner2, banner3, banner4,banner6];

    return (
        <div className="mt-6 rounded-xl overflow-hidden">
            <Carousel autoplay effect="fade" slidesToScroll={3}>
                {banners.map((img, index) => (
                    <div key={index}>
                        <img
                            src={img}
                            className="rounded-xl w-full h-[400px] object-cover"
                            alt={`banner-${index}`}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
