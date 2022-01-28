
class buscarFotos{
  constructor(){
    this.API_KEY = '563492ad6f91700001000001189219803f7b487ab7e93f70518b0bfe';
    this.galleryDIv = document.querySelector('.gallery');
    this.searchForm = document.querySelector('.header form');
    this.loadMore = document.querySelector('.load-more');
    this.logo = document.querySelector('.logo')
    this.pageIndex = 1;
    this.searchValueGlobal = '';
    this.eventHandle();
  }
  eventHandle(){
    document.addEventListener('DOMContentLoaded',()=>{
      this.getImg(3);
    });
    this.searchForm.addEventListener('submit', (e)=>{
      this.pageIndex = 3;

      this.getBuscarImagenes(e);
    });
    this.loadMore.addEventListener('click', (e)=>{
      this.cargarImagenes(e);
    })
    this.logo.addEventListener('click',()=>{
      this.pageIndex = 3;
      this.galleryDIv.innerHTML = '';
      this.getImg(this.pageIndex);
    })
  }
  async getImg(index){
    this.loadMore.setAttribute('data-img', 'curated');
    const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=15`;
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos)
    console.log(data)
  }
  async fetchImages(baseURL){
    const response = await fetch(baseURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: this.API_KEY
      }
    });
    const data = await response.json();
    
    return data;
  }

  
  GenerateHTML(photos){
    photos.forEach(photo=>{
      const item= document.createElement('table');
      item.classList.add('item');
      item.innerHTML = ` <table>
        <td>${photo.photographer_id}</td>
        <td>${photo.photographer_url}</td>
        <td>${photo.avg_color}</td>
        <td>${photo.photographer}</td>
         <td><img src="${photo.src.small}"></td>

      </table>
      `;
      this.galleryDIv.appendChild(item)
    })
  }

    async getBuscarMasImagenes(index){
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=15`
    const data = await this.fetchImages(baseURL);
    console.log(data)
    this.GenerateHTML(data.photos);
  }
  async getBuscarImagenes(e){
    this.loadMore.setAttribute('data-img', 'search');
    e.preventDefault();
    this.galleryDIv.innerHTML='';
    const searchValue = e.target.querySelector('input').value;
    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15`
    const data = await this.fetchImages(baseURL);
    this.GenerateHTML(data.photos);
    e.target.reset();
  }

  cargarImagenes(e){
    let index = ++this.pageIndex;
    const loadMoreData = e.target.getAttribute('data-img');
    if(loadMoreData === 'curated'){
      this.getImg(index)
    }else{
      this.getBuscarMasImagenes(index);
    }
  }
}
const gallery = new buscarFotos;