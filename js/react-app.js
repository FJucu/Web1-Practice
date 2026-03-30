const e = React.createElement;

function App() {
    const initialPlayers = [
        { id: 1, name: 'Haris Attila', number: 18 },
        { id: 2, name: 'Németh Márió', number: 31 },
        { id: 3, name: 'Jovanovic Aleksandar', number: 77 },
        { id: 4, name: 'Kuti Krisztián', number: 14 },
        { id: 5, name: 'Diallo Ulysse', number: 9 },
        { id: 6, name: 'Balogh Balázs', number: 12 },
        { id: 7, name: 'Molnár Gábor', number: 33 },
        { id: 8, name: 'Báló Tamás', number: 7 },
        { id: 9, name: 'Pátkai Máté', number: 17 },
        { id: 10, name: 'Iszlai Bence', number: 10 }
    ];

    const [players, setPlayers] = React.useState(initialPlayers);
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [editId, setEditId] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedName = name.trim();
        const numVal = parseInt(number, 10);

        if (!trimmedName || isNaN(numVal)) return;

        // Validáció: Név (Két szavas forma: Vezetéknév Keresztnév)
        const nameParts = trimmedName.split(/\s+/);
        if (nameParts.length !== 2) {
            alert('Hibás formátum! A névnek pontosan két szóból kell állnia (Vezetéknév és Keresztnév szóközzel elválasztva).');
            return;
        }

        // Validáció: Mezszám (0-99 közötti)
        if (numVal < 0 || numVal > 99) {
            alert('Hibás mezszám! Kérlek 0 és 99 közötti számot adj meg.');
            return;
        }

        if (editId) {
            // Update
            setPlayers(players.map(p => p.id === editId ? { ...p, name: trimmedName, number: numVal } : p));
            setEditId(null);
        } else {
            // Create
            const maxId = players.length > 0 ? Math.max(...players.map(p => p.id)) : 0;
            setPlayers([...players, { id: maxId + 1, name: trimmedName, number: numVal }]);
        }
        setName('');
        setNumber('');
    };

    const handleEdit = (player) => {
        setName(player.name);
        setNumber(player.number.toString());
        setEditId(player.id);
        const input = document.getElementById('player-name');
        if (input) input.focus();
    };

    const handleDelete = (id) => {
        if (window.confirm('Biztosan törölni szeretnéd ezt a játékost?')) {
            setPlayers(players.filter(p => p.id !== id));
            if (editId === id) {
                setName('');
                setNumber('');
                setEditId(null);
            }
        }
    };

    // Form element
    const formElement = e('form', { className: 'crud-form', onSubmit: handleSubmit, id: 'crud-form' },
        e('input', {
            type: 'text',
            id: 'player-name',
            placeholder: 'Vezetéknév Keresztnév',
            value: name,
            pattern: '^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\\-]+\\s[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\\-]+$',
            title: 'Kérjük, pontosan két szót adjon meg (pl. Németh Márió)!',
            onChange: (evt) => setName(evt.target.value),
            autoComplete: 'off',
            required: true
        }),
        e('input', {
            type: 'number',
            id: 'player-number',
            placeholder: 'Mezszám (0-99)',
            value: number,
            min: 0,
            max: 99,
            onChange: (evt) => setNumber(evt.target.value),
            style: { minWidth: '90px', flex: '0.5' },
            required: true
        }),
        e('button', { type: 'submit' }, editId ? 'Mentés' : 'Hozzáadás')
    );

    // Table elements
    const tableRows = players.length === 0
        ? e('tr', null, e('td', { colSpan: 4, style: { textAlign: 'center', padding: '2rem' } }, 'Nincs megjeleníthető játékos.'))
        : players.map(player => {
            return e('tr', { key: player.id },
                e('td', null, player.id),
                e('td', null, player.name),
                e('td', null, player.number),
                e('td', { className: 'actions', style: { textAlign: 'right', justifyContent: 'flex-end' } },
                    e('button', { className: 'btn-edit', onClick: () => handleEdit(player) }, 'Módosítás'),
                    e('button', { className: 'btn-danger', onClick: () => handleDelete(player.id) }, 'Törlés')
                )
            );
        });

    const tableBody = e('tbody', null, tableRows);

    const tableHead = e('thead', null,
        e('tr', null,
            e('th', { style: { width: '10%' } }, 'ID'),
            e('th', null, 'Játékos Név'),
            e('th', { style: { width: '15%' } }, 'Mezszám'),
            e('th', { style: { width: '20%', textAlign: 'right' } }, 'Műveletek')
        )
    );

    const tableContainer = e('div', { className: 'table-container' },
        e('table', { id: 'players-table' }, tableHead, tableBody)
    );

    // Return everything inside a React Fragment wrapper
    return e(React.Fragment, null, formElement, tableContainer);
}

const rootElement = document.getElementById('react-root');
const root = ReactDOM.createRoot(rootElement);
root.render(e(App));
