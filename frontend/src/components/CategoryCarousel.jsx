import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/lawyerSlice';

const category = [
    "Civil  Cases",
    "Criminal Cases",
    "Contract disputes",
    "Torts Cases",
    "Property disputes"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchLawyerHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            {/* <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                              <Button
                                onClick={() => searchLawyerHandler(cat)}
                                variant="outline"
                                className="px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 
                                          border-gray-300 shadow-md hover:shadow-lg hover:bg-gradient-to-r from-purple-600 to-indigo-600 hover:text-white"
                              >
                                {cat}
                              </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}
        </div>
    )
}

export default CategoryCarousel