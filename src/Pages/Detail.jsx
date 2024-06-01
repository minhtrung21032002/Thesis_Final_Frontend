import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Input, Button, Rate } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { setStores } from '../redux/reducers/serviceReducer';

const { TextArea } = Input;
const Detail = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const stores = useSelector(state => state.serviceReducer.stores);
    const userId = useSelector(state => state.serviceReducer.userId);
    console.log(stores); id = id.toString();
    const currentStore = stores.find(store => store._id === id);
    console.log(currentStore);
    const { shop_website, shop_phone, shop_description, shop_short_description, shop_name, shop_reputation_star, shop_reviewers, shop_address } = currentStore;
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const handlePostComment = () => {

        console.log(comment, rating);
        const data = {
            userId,
            storeId: currentStore._id,
            comment: comment,
            rating: rating,
        };

        axios
            .post('http://localhost:3000/serviceCenter/shop/reviewers/api', data)
            .then(response => {
                console.log('Response:', response);
                axios
                    .get('http://localhost:3000/serviceCenter/shop/api')
                    .then(response => {
                        console.log('Data:', response.data);
                        dispatch(setStores(response.data));
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });

            })
            .catch(error => {
                console.error('Error:', error);

            });
    };
    const generateStars = (rating) => {
        const stars = '⭐'.repeat(rating);
        return stars;
    };
    return (
        <div
            style={{
                maxWidth: '1000px',
                margin: '0 auto',
            }}>
            {/* shop photos */}
            <div className='shop-photos'>
                <img src={currentStore.shop_images[0]} alt='shop' />
                <img src={currentStore.shop_images[1]} alt='shop' />
            </div>

            {/* shop info */}
            <div className='shop-overview'>
                <div className='left'>
                    {/* main overview */}
                    <div>
                        <div>
                            <span>{shop_reputation_star} ⭐ </span> <span> {shop_reviewers.length} reviews</span>
                        </div>
                        <h2>{shop_name}</h2>
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: '18px',
                            }}>
                            {shop_short_description}
                        </p>
                        <p>2703 10th St</p>
                        <p>Berkeley, CA 94710</p>
                        <div
                            style={{
                                fontWeight: 500,
                                color: '#0096d1',
                            }}>
                            <span>Get Directions</span>
                            <span
                                style={{
                                    marginInline: '10px',
                                    borderRight: '1px solid #edf0f5',
                                }}></span>
                            <span>Streetview</span>
                        </div>
                        <p>{shop_phone}</p>
                        <p
                            style={{
                                fontWeight: 500,
                                color: '#0096d1',
                            }}>
                            website.com
                        </p>
                    </div>

                    {/* shop features */}

                    <div className='shop-features'>
                        <h2>Shop Features</h2>
                        <div>
                            <h3 className='feature-title'>Features Title</h3>
                            <p
                                style={{
                                    fontSize: '14px',
                                }}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus est blanditiis
                                alias, dolore tempore nisi.
                            </p>
                        </div>
                    </div>

                    {/* about the shop */}
                    <div>
                        <h2>About the shop</h2>
                        <p
                            style={{
                                fontSize: '14px',
                            }}>
                            {shop_description}
                        </p>
                    </div>

                    {/* Message from the shop */}
                    <div>
                        <h2>Message from the shop</h2>
                        <p
                            style={{
                                fontSize: '14px',
                            }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse nihil tempora iste, laborum
                            minima minus delectus itaque excepturi ipsum facere repudiandae dolorem! Dicta neque earum
                            quidem eos necessitatibus voluptate obcaecati iusto. Perspiciatis praesentium magnam ex
                            possimus voluptate perferendis excepturi?
                        </p>
                        <div>


                            <a href={`${shop_website}`}
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: 'white',
                                    color: '#0096d1',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    fontWeight: 500,
                                    border: 'none',
                                    cursor: 'pointer',

                                }}>
                                Visit Website
                            </a>
                        </div>
                    </div>
                </div>

                <div className='right'>
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                            padding: '20px',
                        }}>
                        <p
                            style={{
                                fontWeight: 500,
                            }}>
                            Soonest available time:
                        </p>
                        <p
                            style={{
                                fontWeight: 600,
                                color: 'black',
                            }}>
                            Mon, May 06, 2024 at 8:30 am
                        </p>
                        <button
                            style={{
                                display: 'block',
                                width: '100%',
                                backgroundColor: '#0096d1',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                fontWeight: 500,
                                border: 'none',
                                cursor: 'pointer',
                            }}>
                            Book Appointment
                        </button>
                        <a
                            href='#'
                            style={{
                                color: '#0096d1',
                                display: 'block',
                                padding: '10px 20px',
                                fontWeight: 500,
                            }}>
                            Check Availability
                        </a>
                    </div>
                    <div
                        style={{
                            backgroundColor: '#edf0f5',
                            padding: '20px',
                            borderRadius: '5px',
                            marginTop: '20px',
                        }}>
                        <p
                            style={{
                                color: 'black',
                                fontWeight: 500,
                            }}>
                            Don&apos;t know what&apos;s wrong?
                        </p>
                        <p
                            style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '16px',
                            }}>
                            This shop can help you diagnose your issue, no matter what sound, smoke, or smell you are
                            facing
                        </p>
                    </div>
                </div>
            </div>

            {/* Comments */}
            <div className='comment-section'>
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 500,
                    }}>
                    Overall Rating
                </h3>


                <p>⭐ {shop_reputation_star} ({shop_reviewers.length} reviews)</p>
                <div className='comments'>
                    {shop_reviewers.map((review, index) => (
                        <div className='comment' key={index}>
                            <div className='user-info'>
                                <p style={{ fontWeight: 500 }}>{review.reviewer_name}</p>
                                <p>{review.car_name}</p> {/* Assuming car_name is available */}
                            </div>
                            <div className='comment-detail'>
                                <p style={{ fontWeight: 500 }}>
                                    <span>Rating: {generateStars(review.review_star)}</span>
                                    <span>{new Date(review.reviewer_date).toLocaleDateString()}</span>
                                </p>
                                <p className='comment-content'>{review.reviewer_comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    paddingBottom: '20px'
                }}>
                    <h4>Leave a Comment: <Rate className='custom-rate' onChange={setRating}></Rate></h4>

                    <TextArea rows={4} value={comment} onChange={e => setComment(e.target.value)} />
                    <Button onClick={handlePostComment} type="primary" style={{ width: '18%', marginLeft: 'auto', marginTop: '10px', fontWeight: '500' }}>Post Comment</Button>
                </div>
            </div>
        </div>
    );
};
export default Detail;
