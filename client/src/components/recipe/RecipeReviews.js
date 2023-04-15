import styles from './RecipeReviews.module.scss';
import {useEffect, useRef, useState} from "react";
import api from "../../utils/axiosConfig";

const RecipeReviews = ({recipeId, gridColumn}) => {
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(0);
    const title = useRef('');
    const review = useRef('');
    const [fade, setFade] = useState(false);
    const [submit, setSubmit] = useState(false);

    const [userReview, setUserReview] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            if (recipeId) {
                try {
                    const response = await api.get(`/recipe/${recipeId}`);
                    setReviews(response.data.reviews);
                    setSubmit(false);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchReviews();
    }, [recipeId, submit])

    const starHandler = (e) => {
        setStars(e.target.value);
    }

    const fadeOut = () => {
        setFade(true);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/recipe/${recipeId}`, {
                title: title.current.value,
                content: review.current.value,
                stars: stars
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = response.data;
            setSubmit(true);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={styles.reviews} style={{gridColumn}}>
            <div className={styles.reviews__form}>
                <span
                    className={styles.reviews__form__header}>{!userReview ? "Add Your Review" : "Update Your Review"}</span>
                <form onSubmit={submitHandler}>
                    <div className={styles.reviews__form__group}>
                        <fieldset className={styles.rating}>
                            <input type="radio" id="star5" name="stars" value="5"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star5"
                                   title="5 stars"/>
                            <input type="radio" id="star4half" name="stars" value="4.5"
                                   onChange={starHandler}/>
                            <label
                                className={styles.half}
                                htmlFor="star4half"
                                title="4.5 stars"/>
                            <input type="radio" id="star4" name="stars" value="4"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star4"
                                   title="4 stars"/>
                            <input type="radio" id="star3half" name="stars" value="3.5"
                                   onChange={starHandler}/>
                            <label
                                className={styles.half}
                                htmlFor="star3half"
                                title="3.5 stars"/>
                            <input type="radio" id="star3" name="stars" value="3"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star3"
                                   title="3 stars"/>
                            <input type="radio" id="star2half" name="stars" value="2.5"
                                   onChange={starHandler}/>
                            <label className={styles.half}
                                   htmlFor="star2half"
                                   title="2.5 stars"/>
                            <input type="radio" id="star2" name="stars" value="2"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star2"
                                   title="2 stars"/>
                            <input type="radio" id="star1half" name="stars" value="1.5"
                                   onChange={starHandler}/>
                            <label
                                className={styles.half}
                                htmlFor="star1half"
                                title="1.5 stars"/>
                            <input type="radio" id="star1" name="stars" value="1"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star1"
                                   title="1 star"/>
                            <input type="radio" id="starhalf" name="stars" value=".5"
                                   onChange={starHandler}/>
                            <label className={styles.half}
                                   htmlFor="starhalf"
                                   title="0.5 stars"/>
                        </fieldset>
                    </div>
                    <div className={styles.reviews__form__group}>
                        <label className={styles.reviews__form__group__label} htmlFor="title">Title</label>
                        <input ref={title} className={styles.reviews__form__group__input} type="text" id="title"
                               required/>
                    </div>
                    <div className={styles.reviews__form__group}>
                        <label className={styles.reviews__form__group__label} htmlFor="review">Review</label>
                        <textarea ref={review} className={styles.reviews__form__group__input} id="review" rows="5"
                                  required/>
                    </div>
                    <button className={styles.reviews__form__button}>Submit</button>
                </form>
            </div>


            <div className={styles.reviews__list}>
                <span className={styles.reviews__header}>User Reviews</span>
                <div>
                    <span className={styles.reviews__list__title}>Your Review</span>
                    <div className={`${styles.reviews__list__item} ${fade && styles.reviews__list__item__fadeout}`}>
                        <div className={styles.reviews__list__item__header__selfRating}>
                            <div>
                                <svg className={styles.reviews__star}>
                                    <use href="/sprite.svg#icon-star"></use>
                                </svg>
                                <span
                                    className={styles.reviews__list__item__header__selfRating__text}>5
                                    </span>
                            </div>
                            <button className={styles.reviews__button}>
                                <svg className={styles.reviews__button__close}>
                                    <use href="/sprite.svg#icon-close"></use>
                                </svg>
                                <span className={styles.reviews__button__text}>Delete Review?</span>
                            </button>
                        </div>
                        <div className={styles.reviews__list__item__header}>
                            <h1 className={styles.reviews__list__item__header__title}>title</h1>
                        </div>
                        <div className={styles.reviews__list__item__body}>
                            <span className={styles.reviews__list__item__body__text}></span>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                </div>


                {(reviews.length > 0 || userReview) ?
                    reviews.map(review => (
                        <div className={styles.reviews__list__item} key={review._id}>
                            <div className={styles.reviews__list__item__header__rating}>
                                <svg className={styles.reviews__star}>
                                    <use href="/sprite.svg#icon-star"></use>
                                </svg>
                                <span
                                    className={styles.reviews__list__item__header__rating__text}>{review.stars}/5</span>
                            </div>
                            <div className={styles.reviews__list__item__header}>
                                <h1 className={styles.reviews__list__item__header__title}>{review.title}</h1>
                            </div>
                            <div className={styles.reviews__list__item__body}>
                                <span className={styles.reviews__list__item__body__text}>{review.content}</span>
                            </div>
                        </div>
                    ))
                    : <p>There are no reviews for this movie yet.</p>}

            </div>
        </div>)
}

export default RecipeReviews;