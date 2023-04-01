import styles from './RecipeInstructions.module.scss'
export default function RecipeInstructions(props) {
    return (
        <div className={styles.instructions}>
            <h3 className={styles.instructions__title}>{props.title}</h3>
            <p className={styles.instructions__text}>{props.instr}</p>
        </div>
    )
}