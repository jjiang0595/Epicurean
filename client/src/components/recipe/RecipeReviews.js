import styles from './RecipeReviews.module.scss';
import {useContext, useEffect, useRef, useState} from "react";
import api from "../../utils/axiosConfig";
import {AuthContext} from "../../store/AuthContext";

const RecipeReviews = ({recipeId, gridColumn}) => {
    const {user} = useContext(AuthContext);

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

                    const reviewsList = [];
                    for (let review of response.data.reviews) {
                        if (review.userId === user) {
                            setUserReview(review);
                        } else {
                            reviewsList.push(review)
                        }
                    }
                    setReviews(reviewsList);
                    setSubmit(false);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchReviews();
    }, [recipeId, submit, user])

    const starHandler = (e) => {
        setStars(e.target.value);
    }

    const fadeOut = () => {
        setFade(true);
        setTimeout(() => {
            setFade(false);
        }, 1000);
    }

    const deleteHandler = async () => {
        await api.delete(`/recipe/${recipeId}/${userReview.userId}`)
            .then(() => {
                setReviews(reviews.filter(review => review.userId !== userReview.userId));
                setUserReview(null);
            })
    }

    const updateHandler = async () => {
        await submitReview('PUT')
    }

    const submitHandler = async (e) => {
        await submitReview('POST')
    }

    const submitReview = async (httpMethod) => {
        try {
            await api({
                method: httpMethod,
                url: `/recipe/${recipeId}`,
                data: {
                    title: title.current.value,
                    content: review.current.value,
                    stars: stars,
                    userId: user
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        } catch (error) {
            console.log(error);
        }
    };


    return (
         <div className={styles.reviews} style={{gridColumn}}>
             {user &&
                 <div className={styles.reviews__form}>
                <span
                    className={styles.reviews__form__header}>{!userReview ? "Add Your Review" : "Update Your Review"}</span>
                <form onSubmit={!userReview ? submitHandler : updateHandler}>
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
                    <button className={styles.reviews__form__button}>{!userReview ? 'Submit' : 'Update'}</button>
                </form>
            </div>
         }


            <div className={styles.reviews__list}>
                <span className={styles.reviews__header}>User Reviews</span>
                {(userReview) &&
                    <div key={userReview.userId} className={`${fade && styles.reviews__list__item__fadeout}`}>
                        <span className={styles.reviews__list__title}>Your Review</span>
                        <div className={styles.reviews__list__item}>
                            <div className={styles.reviews__list__item__header__selfRating}>
                                <div>
                                    <svg className={styles.reviews__star}>
                                        <use href="/sprite.svg#icon-star"></use>
                                    </svg>
                                    <span
                                        className={styles.reviews__list__item__header__selfRating__text}>{userReview.stars}/5
                                    </span>
                                </div>
                                <button className={styles.reviews__button}
                                        onClick={() => fadeOut(setTimeout(() => deleteHandler(), 500))}>
                                    <svg className={styles.reviews__button__close}>
                                        <use href="/sprite.svg#icon-close"></use>
                                    </svg>
                                    <span className={styles.reviews__button__text}>Delete Review?</span>
                                </button>
                            </div>
                            <div className={styles.reviews__list__item__header}>
                                <h1 className={styles.reviews__list__item__header__title}>{userReview.title}</h1>
                            </div>
                            <div className={styles.reviews__list__item__body}>
                                <span className={styles.reviews__list__item__body__text}>{userReview.content}</span>
                            </div>
                        </div>
                        <hr></hr>
                        <br></br>
                    </div>
                }


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
                    : <p>There are no reviews for this recipe yet.</p>
                }

            </div>
        </div>)
}

export default RecipeReviews;