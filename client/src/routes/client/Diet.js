import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiet } from '../../actions/dietActions';
import { getRecipes } from '../../actions/recipeActions';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Diet extends Component {
  constructor() {
    super();
    this.state = {
      days: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      fields: ['time_01_monday', 'time_01_tuesday', 'time_01_wednesday', 'time_01_thursday', 'time_01_friday', 'time_01_saturday', 'time_01_sunday',
        'time_02_monday', 'time_02_tuesday', 'time_02_wednesday', 'time_02_thursday', 'time_02_friday', 'time_02_saturday', 'time_02_sunday',
        'time_03_monday', 'time_03_tuesday', 'time_03_wednesday', 'time_03_thursday', 'time_03_friday', 'time_03_saturday', 'time_03_sunday',
        'time_04_monday', 'time_04_tuesday', 'time_04_wednesday', 'time_04_thursday', 'time_04_friday', 'time_04_saturday', 'time_04_sunday'],
      diet: {},
      recipes: [],
      errors: {},
    }
    this.toPDF = this.toPDF.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.diet).length !== 0) { this.setState({ diet: nextProps.diet }) }
    else window.location.href = '/dieta/stworz';
    if (Array.isArray(nextProps.recipes)) this.setState({ recipes: nextProps.recipes })
  }
  componentDidMount() {
    this.props.getDiet();
    this.props.getRecipes();
  }
  getRecipe(e) {
    let recipe = this.state.recipes || this.state.recipes.filter(a => [...new Set(this.state.fields.map(a => this.state.diet[a]).reduce((a, b) => a.concat(b), []))].indexOf(e.name) >= 0)
    window.location.href = `/przepisy/${recipe.filter(a => a.name === e)[0]._id}`
  }
  toPDF() {
    const diet_table = this.state.fields.map(el => this.state.diet[el]);

    const shopping = this.state.recipes || this.state.recipes.filter(e => [...new Set(this.state.fields.map(e => this.state.diet[e]).reduce((a, b) => a.concat(b), []))].indexOf(e.name) >= 0);

    const productsToBuy = shopping.map(e => e.ingredients).reduce((a, b) => a.concat(b), []).filter((e, i, self) => self.findIndex(t => t.name === e.name) === i).map(e => e.name)

    const recipes = shopping.map(e => `${e.name}\nKalorie: ${e.calories}\nBiałko: ${e.protein}\nTłuszcz: ${e.fat}\nWęglowodany: ${e.carbon}\nWykonanie: ${e.execution}\nCechy wykluczajace: ${e.exclude}\n\n`)

    const docDefinition = {
      content: [
        { text: 'Grafik', style: 'header', alignment: 'center' },
        {
          style: 'tableExample',
          table: {
            widths: ['auto', '*', '*', '*', '*', '*', '*', '*'],
            heights: ['auto', 50, 50, 50, 50, 50, 50, 50],
            body: [
              ['Godzina', ...this.state.days],
              [this.state.diet.time_01, ...diet_table.slice(0, 7)],
              [this.state.diet.time_02, ...diet_table.slice(7, 14)],
              [this.state.diet.time_03, ...diet_table.slice(14, 21)],
              [this.state.diet.time_04, ...diet_table.slice(21, 28)],
            ]
          },
          layout: {
            fillColor: (i, node) => i % 2 === 0 ? '#CCCCCC' : null
          },
          pageBreak: 'after'
        },
        { text: 'Przepisy', style: 'header', alignment: 'center' },
        {
          ul: recipes,
          pageBreak: 'after'
        },
        { text: 'Lista zakupów', style: 'header', alignment: 'center' },
        {
          ul: productsToBuy,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableExample: {
          fontSize: 10,
          margin: 5,
          alignment: 'center'
        },
      },
    }
    pdfMake.createPdf(docDefinition).download('Dieta.pdf');
  }
  render() {
    var shopping = this.state.recipes || this.state.recipes.filter(e => [...new Set(this.state.fields.map(e => this.state.diet[e]).reduce((a, b) => a.concat(b), []))].indexOf(e.name) >= 0);

    return (
      <div className="row">
        <div className="col s12" style={{ padding: '0' }}>
          <ul className="tabs">
            <li className="tab col s3"><a href="#grafik">Grafik</a></li>
            <li className="tab col s3"><a href="#lista-zakupow">Lista zakupów</a></li>
            <li className="tab col s3"><a href="#komentarze">Komentarze</a></li>
            <li className="tab col s3"><a href="#opis-i-wlasciwosci">Opis i właściwości</a></li>
          </ul>
        </div>
        <div id="grafik">
          <div className="col left-panel">
            <div className="hour-item-sm card-panel">
              <span>Godzina</span>
            </div>
            <div className="hour-item card-panel">
              Śniadanie {this.state.diet.time_01}:00
            </div>
            <div className="hour-item card-panel">
              Drugie śniadanie {this.state.diet.time_02}:00
            </div>
            <div className="hour-item card-panel">
              Obiad {this.state.diet.time_03}:00
            </div>
            <div className="hour-item card-panel">
              Kolacja {this.state.diet.time_04}:00
            </div>
          </div>
          {this.state.days.map((e, i) => <div key={i} className="col editDiet-sm card-panel">{e}</div>)}
          {this.state.fields.map(el =>
            <div key={el} className="col editDiet card-panel">
              {this.state.diet[el] &&
                <div>{this.state.diet[el].map((e, i) =>
                  <span
                    key={i}
                    className="col s12 grey lighten-3">{e}
                    <a onClick={() => this.getRecipe(e)}>
                      <i className="material-icons right">search</i>
                    </a>
                  </span>)}
                </div>
              }
            </div>
          )}
        </div>
        <div id="lista-zakupow" className="col s6 offset-s3">
          {shopping.map((e, i) =>
            <div key={i} className="collection" style={{ border: 'none' }}>
              <a key={e.name} className="collection-item teal white-text">{e.name}
                <span className="new badge black" data-badge-caption="Węglowodany">{e.carbon}</span>
                <span className="new badge indigo" data-badge-caption="Tłuszcz">{e.fat}</span>
                <span className="new badge green" data-badge-caption="Białko">{e.protein}</span>
                <span className="new badge blue" data-badge-caption="Kcal">{e.calories}</span>
              </a>
              <div className="collection">
                {e.ingredients.map((el, i) =>
                  <a key={i} className="collection-item">{el.name}
                    <span className="new badge orange" data-badge-caption="">{el.category}</span>
                    <span className="new badge purple" data-badge-caption="">{el.unit}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        <div id="komentarze" className="col s6 offset-s3 input-field">
          <ul className="collection">
            {this.state.diet.comments &&
              this.state.diet.comments.map((e, i) =>
                <li key={i} className="collection-item card-panel grey lighten-4">
                  <b><p>{e.date.split('T')[0]}</p></b>
                  <p>{e.data}</p>
                </li>
              )}
          </ul>
        </div>
        <div id="opis-i-wlasciwosci" className="col s2 offset-s5 input-field">
          <button className="btn waves-effect waves-light" onClick={this.toPDF}>Pobierz diete
    <i className="material-icons right">file_download</i>
          </button>
        </div>
      </div>
    )
  }
}

Diet.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  diet: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  diet: state.diet,
  recipes: state.recipes
})

export default connect(mapStateToProps, { getDiet, getRecipes })(Diet)
