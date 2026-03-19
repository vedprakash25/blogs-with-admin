"use client"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Carousel.css"
import Link from 'next/link'

interface SlideProps {
    id: string, title: string, slug: string, excerpt: string, cover_image: string, status: string, views: string, likes: string
}

export const Carousel = ({ data }: { data: SlideProps[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    return <>
        <div className="embla">
            <div className="embla__viewport relative" ref={emblaRef}>
                <div className="embla__container !flex mb-5">
                    {
                        data.map((blog: SlideProps) => {
                            return <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block embla__slide">
                                <div className="relative overflow-hidden md:h-[450px] h-[300px]">
                                    {blog.cover_image && (
                                        <img
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            className="w-full h-full object-top-left object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 max-w-6xl mx-auto px-4 sm:px-6">

                                        <h1 className="text-white text-2xl sm:text-3xl font-bold mt-2 leading-snug max-w-2xl">
                                            {blog.title}
                                        </h1>
                                        {blog.excerpt && (
                                            <p className="text-white/70 text-sm mt-2 max-w-xl line-clamp-2">
                                                {blog.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>


                <div className='flex justify-center gap-4 max-w-6xl mx-auto px-4 sm:px-6'>
                    <button className="embla__prev cursor-pointer border hover:shadow h-10 w-10 flex items-center justify-center rounded-full " onClick={scrollPrev}>
                        <ChevronLeft />
                    </button>
                    <button className="embla__next cursor-pointer border hover:shadow h-10 w-10 flex items-center justify-center rounded-full" onClick={scrollNext}>
                        <ChevronRight />
                    </button>
                </div>
            </div>

        </div>
    </>
}