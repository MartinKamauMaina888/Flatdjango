

function fetchMovies(){
    fetch('http://localhost:3000/films')
        .then(res => res.json())
        .then(data => data.forEach(element => { renderMovies(element) }))
}

function fetchFirstMovies(){
    fetch('http://localhost:3000/films/1')
        .then(res => res.json())
        .then(data => renderFirstMovie(data))
}

function renderMovies(movie) {
    const main = document.querySelector('#films');
   
        const li =document.createElement('li')
        li.className="card"
        li.innerHTML=`
        <div class="card-header">
        <img  src="${movie.poster}">
        </div>
        <div class="card-body">
        <h3>Title: ${movie.title}</h3>
        <h4>Runtime: ${movie.runtime}</h4>
        <h4>Capacity: ${movie.capacity}</h4>
        <h4>Showtime: ${movie.showtime}</h4>
        <h4>Tickets_sold: ${movie.tickets_sold}</h4>
        <h4 id="availableTickets">Available Tickets: ${movie.capacity - movie.tickets_sold}</h4>
        <h5 id="the_description">Description: ${movie.description}</h5>
        
        </div>
         <div class="row allbuttons pb-2 px-3">
        
         <div class="col-md-12">
             <button id="ticketbtn" class="btn btn-success text-white">Buy Ticket</button>
         </div>
      
        </div>
        `

    li.querySelector('#ticketbtn').addEventListener('click', () => {
        if (movie.capacity > movie.tickets_sold) {
            movie.tickets_sold += 1
            li.querySelector("#availableTickets").textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`
            buyTicket(movie)
        } else {
            alert(`No available tickets for ${movie.title}`)
        }
        
    })
  

    main.appendChild(li);

}


function buyTicket(data) {

        fetch(`http://localhost:3000/films/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => console.log(data))
   
    
}

function renderFirstMovie(firstMovie){
    const first = document.querySelector('#firstMovie');

    const p = document.createElement('p')
    // li.className = "card"
    p.innerHTML = `
       <div class="card-header">
        <img  src="${firstMovie.poster}">
        </div>
        <div class="card-body">
         <h3>Title: ${firstMovie.title}</h3>
        <h4>Runtime: ${firstMovie.runtime}</h4>
        <h4>Capacity: ${firstMovie.capacity}</h4>
        <h4>Showtime: ${firstMovie.showtime}</h4>
        <h4>Tickets_sold: ${firstMovie.tickets_sold}</h4>
                <h4 id="availableTickets">Available Tickets: ${firstMovie.capacity - firstMovie.tickets_sold}</h4>

        <h5 id="the_description">Description: ${firstMovie.description}</h5>
        
        </div>

    <div class="row allbuttons pb-2 px-3">
        
         <div class="col-md-12">
             <button id="ticketbtn" class="btn btn-success text-white">Buy Ticket</button>
         </div>
      
        </div>
         
        `

    p.querySelector('#ticketbtn').addEventListener('click', () => {

        if (firstMovie.capacity > firstMovie.tickets_sold) {
            firstMovie.tickets_sold += 1
            p.querySelector("#availableTickets").textContent = `Available Tickets: ${firstMovie.capacity - firstMovie.tickets_sold}`
            buyTicket(firstMovie)
        } else {
            alert(`No available tickets for ${firstMovie.title}`)
        }
        
    })

    

    first.appendChild(p);
}


document.addEventListener('DOMContentLoaded', function () {
    fetchMovies();
    fetchFirstMovies();

});
