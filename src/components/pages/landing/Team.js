import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";

export default class Team extends Component {
  render() {
    return (
      <section id="team" class="team text-center">
        <div className="container">
        <h2 class="text-white h2 mb-3">Our Team</h2>

        <MDBContainer>
          <MDBCarousel
            activeItem={1}
            length={8}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
          >
            <MDBCarouselInner>

              <MDBCarouselItem itemId="1">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Rakhmat Wathon</h3>
                      <p className="text-primary h5">Front-end Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="2">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Hendri Agustino</h3>
                      <p className="text-primary h5">Front-end Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="3">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Winata Arafad</h3>
                      <p className="text-primary h5">Front-end Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="4">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Bobbi Samuel</h3>
                      <p className="text-primary h5">Back-end Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="5">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Andriana Butar Butar</h3>
                      <p className="text-primary h5">Back-end Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="6">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Muhammad Hasymi</h3>
                      <p className="text-primary h5">Back-end Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="7">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">David Novianto</h3>
                      <p className="text-primary h5">Mobile Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

              <MDBCarouselItem itemId="8">
                <MDBView>
                  <div className="team-item w-100">
                      <img class="rounded-circle" src="https://via.placeholder.com/150" alt="avatar" />
                      <h3 className="text-primary h2 my-2">Rangga</h3>
                      <p className="text-primary h5">Mobile Developer</p>
                  </div>
                </MDBView>
              </MDBCarouselItem>

            </MDBCarouselInner>
          </MDBCarousel>
        </MDBContainer>
        </div>
      </section>
    )
  }
}
