import styles from './RecipeReviews.module.scss';
import {useEffect, useRef, useState} from "react";

const RecipeReviews = ({recipeId, gridColumn}) => {
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(0);
    const title = useRef('');
    const review = useRef('');
    const [fade, setFade] = useState(false);

    const [userReview, setUserReview] = useState(null);

    const starHandler = (e) => {
        setStars(e.target.value);
    }

    const fadeOut = () => {
        setFade(true);
    }

    const submitHandler = (e) => {

    }


    return (
        <div className={styles.reviews} style={{ gridColumn }}>

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
                                   title="Awesome - 5 stars"/>
                            <input type="radio" id="star4half" name="stars" value="4.5"
                                   onChange={starHandler}/>
                            <label
                                className={styles.half}
                                htmlFor="star4half"
                                title="Pretty good - 4.5 stars"/>
                            <input type="radio" id="star4" name="stars" value="4"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star4"
                                   title="Pretty good - 4 stars"/>
                            <input type="radio" id="star3half" name="stars" value="3.5"
                                   onChange={starHandler}/>
                            <label
                                className={styles.half}
                                htmlFor="star3half"
                                title="Meh - 3.5 stars"/>
                            <input type="radio" id="star3" name="stars" value="3"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star3"
                                   title="Meh - 3 stars"/>
                            <input type="radio" id="star2half" name="stars" value="2.5"
                                   onChange={starHandler}/>
                            <label className={styles.half}
                                   htmlFor="star2half"
                                   title="Kinda bad - 2.5 stars"/>
                            <input type="radio" id="star2" name="stars" value="2"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star2"
                                   title="Kinda bad - 2 stars"/>
                            <input type="radio" id="star1half" name="stars" value="1.5"
                                   onChange={starHandler}/>
                            <label
                                className={styles.half}
                                htmlFor="star1half"
                                title="Meh - 1.5 stars"/>
                            <input type="radio" id="star1" name="stars" value="1"
                                   onChange={starHandler}/>
                            <label className="full"
                                   htmlFor="star1"
                                   title="Sucks big time - 1 star"/>
                            <input type="radio" id="starhalf" name="stars" value=".5"
                                   onChange={starHandler}/>
                            <label className={styles.half}
                                   htmlFor="starhalf"
                                   title="Sucks big time - 0.5 stars"/>
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
                </form> : <p className={styles.reviews__form__guest}>Please login to leave a review!</p>
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
                                <button className={styles.reviews__button} >
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


            <p>There are no reviews for this recipe yet.</p>

            </div>
        </div>)
}

export default RecipeReviews;