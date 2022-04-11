import { Avatar, Button, Rate, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProductById, getProductRatings } from '../../Redux/actions/products';
import moment from 'moment';

function ProductDetails() {
    const params = useParams();
    const queryClient = useQueryClient();
    const { isLoading, data: res, error } = useQuery(['product', params.id], () => getProductById(params.id));
    const { isLoading: loadingRates, data: ratings } = useQuery(['ratings', params.id], () => getProductRatings(params.id));
    const product = res?.data?.data || {};
    const images = product?.Colors?.length > 0 && product?.Colors?.map(color => ({url: color.image, id: color.id})) || [];
    images.unshift({ url: product?.cover });
    const [cover, setCover] = useState({ index: 0, image: product.cover, id: '' });
    const [active, setActive] = useState(1);

    useEffect(() => {
        (() =>{
            setCover({ index: 0, image: product.cover });
        })()
    }, [product])

  return (
    <div className='product-detail'>
        <div className="intro">
            <div className="image">
                <div className="cover">
                    {
                        isLoading ?
                        <Skeleton.Input style={{ width: 500, height: 400 }} active loading={true} size='large' />:
                        <>
                            <img src={cover.image} id='image' alt="product" srcset="" />
                            <div className="lens"></div>
                            <div className="res-container">
                                <div className="result"></div>
                            </div>
                        </>
                    }
                </div>
                <div className="color-images">
                    {
                        isLoading ?
                        <Skeleton.Input style={{ width: 500, height: 40 }} active loading={true} size='large' />:
                        images?.map((image, index) => (
                            image && <img src={image.url} className={cover.index === index ? 'selected': ''} key={index} onClick={() =>setCover({ image: image.url, index, id: image.id })} />
                        ))
                    }
                </div>
            </div>
            <div className="info">
                {
                    isLoading ?
                    <Skeleton.Input style={{ width: 200, marginBottom: '1rem', height: 40 }} active loading={true} size='large' />:
                    <div className="name">{product.name}</div>
                }
                {
                    isLoading ?
                    <Skeleton style={{ width: 600, marginBottom: '1rem', height: 40 }} active loading={true} size='large' />:
                    <div className="descript">{product.description}</div>
                }
                {
                    isLoading ?
                    <Skeleton.Input style={{ width: 200, height: 40 }} active loading={true} size='large' />:
                    product.sizes && product.sizes.length > 0 &&
                    <div className="sizes">
                        <div className="title">Tailles : </div>
                        {product.sizes?.map(size => (
                            <div className={`size`} key={size}>{size}</div>
                        ))}
                    </div>
                }
                {
                    !isLoading &&
                    <div className="stock">
                        <div className="title">Stock : </div>
                        { product.quantity ? `${product.quantity+product.quantityMetric}`: 'Indisponible' }
                    </div>
                }
                {
                    !isLoading &&
                    <>
                        <div className="rated"><Rate disabled defaultValue={
                            product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length
                        } className='rate' /></div>
                        <div className="price">
                            {product.currency === "USD" ? '$': "FC"}{product.price-(product.discount || 0)}
                            { product.discount && <span className="discounted">{product.currency === "USD" ? '$': "FC"}{product.price}</span> }
                        </div>
                    </>
                }
            </div>
        </div>
        <div className="other-infos">
            <div className="titles">
                <div className={`title ${active === 1 ? 'active': ''}`} onClick={() =>setActive(1)}>Description</div>
                <div className={`title ${active === 2 ? 'active': ''}`} onClick={() =>setActive(2)}>Avis</div>
            </div>
            <div className="content">
                {
                    active === 1 ?
                    <>
                        <div className="title">Caracteristiques</div>
                        <div className="items">
                            {
                                product?.specifications?.map((spec, index) => (
                                    <div className="item" key={index}>
                                        {spec.key} : {spec.value}
                                    </div>
                                ))
                            }
                        </div>
                    </>:
                    <>
                        <div className="reviews">
                            {
                                ratings?.ratings?.map((rat, index) => (
                                    <div className="review" key={index}>
                                        <div className="user">
                                            <div className="avatar">
                                                <Avatar size={50} >
                                                {rat?.User.cover ? 
                                                    <img src={rat?.User.cover} alt="avatar" srcset="" />:
                                                    <HiOutlineUser className='icon' />
                                                }
                                                </Avatar>
                                            </div>
                                            <div className="left">
                                                <div className="name">{rat.User?.fullname}</div>
                                                <Rate disabled value={rat.value} className='rate' /> <span className="value">{rat.value}</span>
                                                <span className="date"> {moment(rat.createdAt).fromNow()} </span>
                                            </div>
                                        </div>
                                        <div className="comment"> {rat.comment} </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default ProductDetails