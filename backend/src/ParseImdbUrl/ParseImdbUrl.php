<?php

namespace App\ParseImdbUrl;

use DOMDocument;
use DOMXPath;

class ParseImdbUrl
{

    const URL = 'https://www.imdb.com/title/tt<id>/';

    protected $data = [];
    protected $url = '';
    protected $content;
    protected $movie_id;

    public function getUrl()
    {
        return str_replace('<id>', $this->getMovieId(), static::URL);
    }

    public function setMovieId($id)
    {
        $this->movie_id = $id;
    }

    public function getMovieId()
    {
        return $this->movie_id;
    }

    public function setContent($content)
    {
        $this->content = $content;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function process()
    {
        $this->fetchContent();
        $this->parseContent();
    }

    public function getData()
    {
        return $this->data;
    }

    public function getJSON()
    {
        return json_encode($this->getData());
    }

    public function setData($data = [])
    {
        $this->data = $data;
    }

    public function clearData()
    {
        $this->url = '';
        $this->content = '';
        $this->data = [];
    }

    public function createCurlHandler()
    {
        $handler = curl_init();
        $user_agent = 'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';
        $options = [
            CURLOPT_URL => $this->getUrl(),
            CURLOPT_CUSTOMREQUEST  => "GET",        //set request type post or get
            CURLOPT_POST           => false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     => "cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      => "cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
        ];

        curl_setopt_array($handler, $options);

        return $handler;
    }

    public function fetchContent()
    {
        $handler = $this->createCurlHandler();
        $content = curl_exec($handler);
        curl_close($handler);
        $this->setContent($content);
    }

    public function parseContent()
    {
        $content = $this->getContent();
        $content = str_replace("\n", '', $content);
        $c = $this->getContent();
        $d = new DOMDocument();
        @$d->loadHTML($c);
        $xp = new DOMXPath($d);
        $jsonScripts = $xp->query('//script[@type="application/ld+json"]');
        $json = trim($jsonScripts->item(0)->nodeValue); // get the first script only (it should be unique anyway)
        $data = json_decode($json, true);
        $data['summary'] = '';
        if (array_key_exists('description', $data))
            $data['summary'] = trim($data['description']);
        $this->setData($data);
    }
}
