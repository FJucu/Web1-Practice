const e = React.createElement;

function App() {
    const initialClubs = [
        { id: 1, name: 'Vasas FC' },
        { id: 2, name: 'Ferencvárosi TC' },
        { id: 3, name: 'Puskás Akadémia FC' },
        { id: 4, name: 'Debreceni VSC' },
        { id: 5, name: 'Budapest Honvéd FC' },
        { id: 6, name: 'Szombathelyi Haladás' },
        { id: 7, name: 'Paksi FC' },
        { id: 8, name: 'Mezőkövesd Zsóry FC' },
        { id: 9, name: 'Diósgyőri VTK' },
        { id: 10, name: 'Újpest FC' },
        { id: 11, name: 'Balmazújváros FC' },
        { id: 12, name: 'Videoton FC' }
    ];

    const [clubs, setClubs] = React.useState(initialClubs);
    const [name, setName] = React.useState('');
    const [editId, setEditId] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        if (editId) {
            // Update
            setClubs(clubs.map(c => c.id === editId ? { ...c, name: trimmed } : c));
            setEditId(null);
        } else {
            // Create
            const maxId = clubs.length > 0 ? Math.max(...clubs.map(c => c.id)) : 0;
            setClubs([...clubs, { id: maxId + 1, name: trimmed }]);
        }
        setName('');
    };

    const handleEdit = (club) => {
        setName(club.name);
        setEditId(club.id);
        const input = document.getElementById('club-name');
        if (input) input.focus();
    };

    const handleDelete = (id) => {
        if (window.confirm('Biztosan törölni szeretnéd ezt a csapatot?')) {
            setClubs(clubs.filter(c => c.id !== id));
            if (editId === id) {
                setName('');
                setEditId(null);
            }
        }
    };

    // Form element
    const formElement = e('form', { className: 'crud-form', onSubmit: handleSubmit, id: 'crud-form' }, 
        e('input', {
            type: 'text',
            id: 'club-name',
            placeholder: 'Csapatnév megadása (pl. Vasas FC)',
            value: name,
            onChange: (evt) => setName(evt.target.value),
            autoComplete: 'off',
            required: true
        }),
        e('button', { type: 'submit' }, editId ? 'Mentés' : 'Hozzáadás')
    );

    // Table elements
    const tableRows = clubs.length === 0 
        ? e('tr', null, e('td', { colSpan: 3, style: { textAlign: 'center', padding: '2rem' } }, 'Nincs megjeleníthető csapat.'))
        : clubs.map(club => {
            return e('tr', { key: club.id },
                e('td', null, club.id),
                e('td', null, club.name),
                e('td', { className: 'actions', style: { textAlign: 'right', justifyContent: 'flex-end' } },
                    e('button', { className: 'btn-edit', onClick: () => handleEdit(club) }, 'Módosítás'),
                    e('button', { className: 'btn-danger', onClick: () => handleDelete(club.id) }, 'Törlés')
                )
            );
        });

    const tableBody = e('tbody', null, tableRows);

    const tableHead = e('thead', null, 
        e('tr', null, 
            e('th', { style: { width: '10%' } }, 'ID'),
            e('th', null, 'Csapatnév'),
            e('th', { style: { width: '20%', textAlign: 'right' } }, 'Műveletek')
        )
    );

    const tableContainer = e('div', { className: 'table-container' },
        e('table', { id: 'clubs-table' }, tableHead, tableBody)
    );

    // Return everything inside a React Fragment wrapper
    return e(React.Fragment, null, formElement, tableContainer);
}

const rootElement = document.getElementById('react-root');
const root = ReactDOM.createRoot(rootElement);
root.render(e(App));
