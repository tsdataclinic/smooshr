#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

use std::fs::File;
use std::io::BufReader;

use finalfusion::prelude::*;


#[get("/")]
fn index() -> &'static str{
   "Hello World"
}


fn main() {
    println!("Loading embeding");
    let mut reader = BufReader::new(File::open("../data/GoogleNews-vectors-negative300.bin").unwrap());
    let embedings = Embeddings::read_word2vec_binary_lossy(&mut reader).unwrap();
    println!("Loaded embeding");
    let embed  = embedings.embedding("Test");
    //rocket::ignite().mount("/",routes![index]).launch();
    match embed{
        Some(e) => println!("Got Embedding"),
        None => println!("Not an embeding")
    }
    println!("Hello, world!");
}
