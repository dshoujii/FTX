pageUrl = window.location.href;


console.log('当前页面URL:', pageUrl);

if (pageUrl.startsWith('https://www.basketball-reference.com/players/')) {
    const thead = document.querySelector('#per_game thead tr');
    thead.innerHTML += '<th>GMSC</th>';
    const pergameTrs = document.querySelectorAll('#per_game tbody tr');
    const totalsTrs = document.querySelectorAll('#totals tbody tr');
    totalsTrs.forEach((tr, index) => {
        const data = [];
        let gmsc;
        tr.querySelectorAll('td').forEach((td) => {
            data.push(td.innerHTML);
        });
        gmsc = (Number(data[28].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[20].match(/\d+(\.\d+)?/g)[0]) + 0.3 * Number(data[21].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[23].match(/\d+(\.\d+)?/g)[0]) + Number(data[24].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[25].match(/\d+(\.\d+)?/g)[0]) + 0.4 * Number(data[7].match(/\d+(\.\d+)?/g)[0]) - 0.7 * Number(data[8].match(/\d+(\.\d+)?/g)[0]) - 0.4 * (Number(data[18].match(/\d+(\.\d+)?/g)[0]) - Number(data[17].match(/\d+(\.\d+)?/g)[0])) - Number(data[26].match(/\d+(\.\d+)?/g)[0]) - 0.4 * Number(data[27].match(/\d+(\.\d+)?/g)[0])) / Number(data[4].match(/\d+(\.\d+)?/g)[0]);
        gmsc = gmsc.toFixed(1);
        pergameTrs[index].innerHTML += `<td>${gmsc}</td>`;
    })
    const pergameFootTr = document.querySelector('#per_game tfoot tr');
    const totalsFootTr = document.querySelector('#totals tfoot tr');
    const data = [];
    let gmsc;
    totalsFootTr.querySelectorAll('td').forEach((td) => {
        data.push(td.innerHTML);
    });
    console.log(data);
    gmsc = (Number(data[28].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[20].match(/\d+(\.\d+)?/g)[0]) + 0.3 * Number(data[21].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[23].match(/\d+(\.\d+)?/g)[0]) + Number(data[24].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[25].match(/\d+(\.\d+)?/g)[0]) + 0.4 * Number(data[7].match(/\d+(\.\d+)?/g)[0]) - 0.7 * Number(data[8].match(/\d+(\.\d+)?/g)[0]) - 0.4 * (Number(data[18].match(/\d+(\.\d+)?/g)[0]) - Number(data[17].match(/\d+(\.\d+)?/g)[0])) - Number(data[26].match(/\d+(\.\d+)?/g)[0]) - 0.4 * Number(data[27].match(/\d+(\.\d+)?/g)[0])) / Number(data[4].match(/\d+(\.\d+)?/g)[0]);
    console.log(gmsc);
    gmsc = gmsc.toFixed(1);
    pergameFootTr.innerHTML += `<td>${gmsc}</td>`;
}

if (pageUrl.startsWith('https://www.basketball-reference.com/leagues/')) {
    document.querySelector('#totals_stats thead tr').innerHTML += '<th>GMSC</th>';
    const totalsTrs = document.querySelectorAll('#totals_stats tbody tr');
    totalsTrs.forEach(tr => {
        console.log(tr.className);
        if (tr.className === 'thead') {
            tr.innerHTML += `<td>GMSC</td>`;
        } else {
            const data = [];
            let gmsc;
            tr.querySelectorAll('td').forEach((td) => {
                data.push(td.innerHTML);
            });
            gmsc = (Number(data[28].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[20].match(/\d+(\.\d+)?/g)[0]) + 0.3 * Number(data[21].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[23].match(/\d+(\.\d+)?/g)[0]) + Number(data[24].match(/\d+(\.\d+)?/g)[0]) + 0.7 * Number(data[25].match(/\d+(\.\d+)?/g)[0]) + 0.4 * Number(data[7].match(/\d+(\.\d+)?/g)[0]) - 0.7 * Number(data[8].match(/\d+(\.\d+)?/g)[0]) - 0.4 * (Number(data[18].match(/\d+(\.\d+)?/g)[0]) - Number(data[17].match(/\d+(\.\d+)?/g)[0])) - Number(data[26].match(/\d+(\.\d+)?/g)[0]) - 0.4 * Number(data[27].match(/\d+(\.\d+)?/g)[0])) / Number(data[4].match(/\d+(\.\d+)?/g)[0]);
            gmsc = gmsc.toFixed(1);
            tr.innerHTML += `<td>${gmsc}</td>`;
        }
    })
}