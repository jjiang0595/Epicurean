import styles from './RecipeInstructions.module.scss';
import { useEffect, useRef } from 'react';

export default function RecipeInstructions(props) {
    return (
        <div className={styles.instructions}>
            <h3 className={styles.instructions__title}>{props.title}</h3>
            <p className={styles.instructions__text} style={{ whiteSpace: "pre-line" }}>
                {props.instr}
            </p>
        </div>
    );
}