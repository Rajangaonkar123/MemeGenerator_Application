import React, { Component } from 'react';
import './index.css';
class MemeGenerator extends Component 
{
	constructor() 
	{
		super();
		this.state = {
			topText: '',
      		bottomText: '',
      		randomImg: 'http://i.imgflip.com/1bij.jpg',
      		allMemeImgs: []
		};

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount()
	{
	  fetch("https://api.imgflip.com/get_memes")
	    .then(response => response.json())
	    .then(response => {
	  const { memes } = response.data
	  this.setState({ allMemeImgs: memes })
	  })
	}

	handleChange(event) 
	{
		const { name, value } = event.target
		this.setState({ [name]: value })
	}


	handleSubmit(event) 
	{	event.preventDefault()
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const randMemeImg = this.state.allMemeImgs[randNum].url;
		this.setState({ randomImg: randMemeImg });
  		
	}



	render() 
	{
		return (
			<div >
				    <form className="meme-form" onSubmit={this.handleSubmit}>
						<input
						  
				          type="text"
				          name="topText"
				          placeholder="Top Text"
				          value={this.state.topText}
				          onChange={this.handleChange}
				        />

				        <input
				        
				          type="text"
				          name="bottomText"
				          placeholder="Bottom Text"
				          value={this.state.bottomText}
				          onChange={this.handleChange}
				        />

				    	<button>Gen</button>
				  	</form>
					<div className='meme' >
						<img width={500} height={350} style={{position:'relative'}} src={this.state.randomImg} alt='' />
						
						<h1  style={{position: 'absolute', top:'110px', left:'16px',color:'white'}} className='top'>{this.state.topText}</h1>
						<h1 style={{position: 'absolute', bottom:'70px', left:'16px',color:'white'}} className='bottom'>{this.state.bottomText}</h1>
					</div>

			</div>
		)
	}

}


export default MemeGenerator;
