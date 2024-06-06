export default function Log({ log }) {
    return (
        <ol id="log">
            {log.map(turn => {
                const { square, player } = turn;
                const { row, col } = square;
                return (<li key={player+row+col}>
                    {player} chose {row},{col}
                </li>);
            })}
        </ol>
    );
}