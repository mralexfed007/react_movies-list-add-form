import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imdbUrl: '',
    imgUrl: '',
    imdbId: '',
    isButtonHidden: true,
    isTitleValid: true,
    isImdbUrlValid: true,
    isImgUrlValid: true,
    isImdbIdValid: true,
  };

  newFilmHandler = () => {
    const {
      title, description, imdbUrl, imdbId, imgUrl, isTitleValid,
      isImdbUrlValid, isImdbIdValid, isImgUrlValid,
    } = this.state;

    if (isTitleValid && isImdbUrlValid && isImgUrlValid && isImdbIdValid) {
      this.props.addMovie({
        title,
        description,
        imdbUrl,
        imgUrl,
        imdbId,
      });
      this.setState({
        title: '',
        description: '',
        imdbUrl: '',
        imgUrl: '',
        imdbId: '',
        isButtonHidden: true,
        isTitleValid: true,
        isImdbUrlValid: true,
        isImgUrlValid: true,
        isImdbIdValid: true,
      });
    }
  }

  dataCheked = (event, validator) => {
    const { value, name } = event.target;

    switch (name) {
      case 'imgUrl':
      case 'imdbUrl':
        this.setState({
          // eslint-disable-next-line max-len
          [validator]: /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
            .test(value),
        });
        break;

      default:
        this.setState({
          [validator]: (value !== '') ? Boolean(value) : false,
        });
        break;
    }

    this.setState(state => ({
      isButtonHidden: !(state.isTitleValid && state.isImdbUrlValid
        && state.isImgUrlValid && state.isImdbIdValid),
    }));
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      title, description, imdbId, imdbUrl, imgUrl, isButtonHidden,
      isTitleValid, isImdbIdValid, isImdbUrlValid, isImgUrlValid,
    } = this.state;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.newFilmHandler();
        }}
      >
        <fieldset className="formField">
          <legend>Add new Film</legend>
          <label>
            Title
            <input
              className={!isTitleValid ? 'warning' : ''}
              type="text"
              name="title"
              placeholder="Film title"
              value={title}
              onChange={this.handleChange}
              required
              onBlur={(event) => {
                this.dataCheked(event, 'isTitleValid');
              }}
            />
            {!isTitleValid && <span>Enter title, please</span>}
          </label>
          <label>
            Description
            <input
              type="text"
              name="description"
              placeholder="Film description"
              value={description}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Imdb Id
            <input
              className={!isImdbIdValid ? 'warning' : ''}
              type="text"
              name="imdbId"
              placeholder="ImdbId"
              value={imdbId}
              onChange={this.handleChange}
              onBlur={(event) => {
                this.dataCheked(event, 'isImdbIdValid');
              }}
              required
            />
            {!isImdbIdValid && <span>Enter valid Id, please</span>}
          </label>
          <label>
            Imdb Url
            <input
              className={!isImdbUrlValid ? 'warning' : ''}
              type="text"
              name="imdbUrl"
              placeholder="ImdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
              onBlur={(event) => {
                this.dataCheked(event, 'isImdbUrlValid');
              }}
              required
            />
            {!isImdbUrlValid && <span>Enter valid Imdb Url, please</span>}
          </label>
          <label>
            Img Url
            <input
              className={!isImgUrlValid ? 'warning' : ''}
              type="text"
              name="imgUrl"
              placeholder="ImgUrl"
              value={imgUrl}
              onChange={this.handleChange}
              onBlur={(event) => {
                this.dataCheked(event, 'isImgUrlValid');
              }}
              required
            />
            {!isImgUrlValid && <span>Enter valid Id, please</span>}
          </label>

        </fieldset>
        <button
          type="submit"
          disabled={isButtonHidden}
        >
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
