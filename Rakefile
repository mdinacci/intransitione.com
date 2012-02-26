task :default => :build

desc 'Clean up generated site'
task :clean do
  cleanup
end

desc 'Compile less files [Development]'
task :lessdev do
  lessdev
end

desc 'Compile less files'
task :less do
  lessc
end

desc 'Build site with Jekyll'
task :build => [:clean,:less] do
  jekyll('--no-server --no-auto')
end

desc 'Start server with --auto'
task :server => :build do
  jekyll('--server --auto')
end

desc 'Build and deploy'
task :deploy do
  sh 'rsync -rtzh --progress --delete _site/ marco@95.154.250.249:/var/www/intransitione.com/'
end

desc 'Create a new post'
task :newpost do
end

desc 'Check links for site already running on localhost:4000'
task :check_links do
  begin
    require 'anemone'
    root = 'http://localhost:4000/'
    Anemone.crawl(root, :discard_page_bodies => true) do |anemone|
      anemone.after_crawl do |pagestore|
        broken_links = Hash.new { |h, k| h[k] = [] }
        pagestore.each_value do |page|
          if page.code != 200
            referrers = pagestore.pages_linking_to(page.url)
            referrers.each do |referrer|
              broken_links[referrer] << page
            end
          end
        end
        broken_links.each do |referrer, pages|
          puts "#{referrer.url} contains the following broken links:"
          pages.each do |page|
            puts "  HTTP #{page.code} #{page.url}"
          end
        end
      end
    end

  rescue LoadError
    abort 'Install anemone gem: gem install anemone'
  end
end

def cleanup
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  sh 'jekyll ' + opts
end

def lessdev(opts = '')
    FileUtils.mkdir_p("_site/css")
    sh 'lessc -x _less/screen.less _site/css/screen.css'
    sh 'lessc -x _less/contact.less _site/css/contact.css'
end

def lessc(opts = '')
    sh 'lessc -x _less/screen.less css/screen.css'
    sh 'lessc -x _less/contact.less css/contact.css'
end

